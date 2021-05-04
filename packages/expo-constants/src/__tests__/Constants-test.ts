import { Platform } from 'react-native';

import Constants, { ExecutionEnvironment } from '../Constants';

it(`defines a manifest`, () => {
  expect(Constants.manifest).toBeTruthy();
  expect(typeof Constants.manifest).toBe('object');
});

it(`defines a linking URI and URL`, () => {
  expect(typeof Constants.linkingUri).toBe('string');
  expect(Constants.linkingUri).toBe(Constants.linkingUrl);
});

function mockExponentConstants(mockValues: object) {
  jest.doMock('../ExponentConstants', () => {
    const ExponentConstants = jest.requireActual('../ExponentConstants');
    return {
      ...ExponentConstants,
      ...mockValues,
    };
  });
}

describe(`manifest`, () => {
  const fakeManifest = { id: '@jester/manifest' };
  const fakeManifest2 = { id: '@jester/manifest2' };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.dontMock('../ExponentConstants');
    jest.dontMock('@unimodules/core');
  });

  // mock console.warn
  const originalWarn = console.warn;
  beforeEach(() => {
    console.warn = jest.fn();
  });
  afterEach(() => (console.warn = originalWarn));

  function mockNativeModulesProxy(mockValues: object) {
    jest.doMock('@unimodules/core', () => {
      const UnimodulesCore = jest.requireActual('@unimodules/core');
      return {
        ...UnimodulesCore,
        NativeModulesProxy: {
          ...(UnimodulesCore.NativeModulesProxy ?? {}),
          ...mockValues,
        },
      };
    });
  }

  function mockExpoUpdates(mockValues: object) {
    jest.doMock('@unimodules/core', () => {
      const UnimodulesCore = jest.requireActual('@unimodules/core');
      return {
        ...UnimodulesCore,
        NativeModulesProxy: {
          ...(UnimodulesCore.NativeModulesProxy ?? {}),
          ExpoUpdates: {
            ...(UnimodulesCore.NativeModulesProxy?.ExpoUpdates ?? {}),
            ...mockValues,
          },
        },
      };
    });
  }

  it(`exists if defined as an object in ExponentConstants`, () => {
    mockExponentConstants({ manifest: fakeManifest });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it(`exists if defined as a string in ExponentConstants`, () => {
    mockExponentConstants({ manifest: JSON.stringify(fakeManifest) });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it(`exists if defined as an object by expo-updates`, () => {
    mockExponentConstants({ manifest: undefined });
    mockExpoUpdates({ manifest: fakeManifest, manifestString: undefined });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it(`exists if defined as a string by expo-updates`, () => {
    mockExponentConstants({ manifest: undefined });
    mockExpoUpdates({ manifest: undefined, manifestString: JSON.stringify(fakeManifest) });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it(`is null if undefined in ExponentConstants and expo-updates with bare execution environment`, () => {
    mockExponentConstants({ manifest: undefined, executionEnvironment: ExecutionEnvironment.Bare });
    mockExpoUpdates({ manifest: undefined, manifestString: undefined });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toBeNull();

    // Skip warnings on web
    if (Platform.OS === 'web') {
      expect(console.warn).not.toHaveBeenCalled();
    } else {
      expect(console.warn).toHaveBeenCalled();
    }
  });

  it(`is null if undefined in ExponentConstants, and expo-updates does not exist with bare execution environment`, () => {
    mockExponentConstants({ manifest: undefined, executionEnvironment: ExecutionEnvironment.Bare });
    mockNativeModulesProxy({ ExpoUpdates: undefined });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toBeNull();

    // Skip warnings on web
    if (Platform.OS === 'web') {
      expect(console.warn).not.toHaveBeenCalled();
    } else {
      expect(console.warn).toHaveBeenCalled();
    }
  });

  it(`is overridden by expo-updates if both are defined`, () => {
    mockExponentConstants({ manifest: fakeManifest });
    mockExpoUpdates({ manifest: fakeManifest2 });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest2);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it(`is not overridden if expo-updates exports an empty manifest`, () => {
    mockExponentConstants({ manifest: fakeManifest });
    mockExpoUpdates({ manifest: {} });
    const ConstantsWithMock = require('../Constants').default;
    expect(ConstantsWithMock.manifest).toMatchObject(fakeManifest);
    expect(console.warn).not.toHaveBeenCalled();
  });

  // web will only ever be in bare environment
  if (Platform.OS !== 'web') {
    [ExecutionEnvironment.Standalone, ExecutionEnvironment.StoreClient].forEach(env => {
      it(`throws an error if manifest is falsey when Constants.executionEnvironment is ${env}`, () => {
        mockExponentConstants({
          manifest: null,
          executionEnvironment: env,
        });
        const ConstantsWithMock = require('../Constants').default;
        expect(() => ConstantsWithMock.manifest).toThrowErrorMatchingSnapshot();
      });
    });
  }
});

describe(`manifestDerivedMethods`, () => {
  const legacyManifest = { id: '@jester/manifest', sdkVersion: '36.0.0' };
  const newManifest = {
    id: '6abaa89a-34e1-4c91-82fe-9139530dcf3f',
    updateMetadata: {},
    runtimeVersion: 'exposdk:36.0.0',
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.dontMock('../ExponentConstants');
  });

  describe(`getSDKVersion`, () => {
    it('returns SDK version for legacy manifest', () => {
      mockExponentConstants({ manifest: legacyManifest });
      const ConstantsWithMock = require('../Constants').default;
      expect(ConstantsWithMock.manifestDerivedMethods.getSDKVersion()).toEqual('36.0.0');
    });

    it('returns SDK version for new manifest', () => {
      mockExponentConstants({ manifest: newManifest });
      const ConstantsWithMock = require('../Constants').default;
      expect(ConstantsWithMock.manifestDerivedMethods.getSDKVersion()).toEqual('36.0.0');
    });
  });
});
