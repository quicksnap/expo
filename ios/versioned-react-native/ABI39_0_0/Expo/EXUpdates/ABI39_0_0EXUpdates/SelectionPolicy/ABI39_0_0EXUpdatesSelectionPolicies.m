//  Copyright © 2021 650 Industries. All rights reserved.

#import <ABI39_0_0EXUpdates/ABI39_0_0EXUpdatesSelectionPolicies.h>

NS_ASSUME_NONNULL_BEGIN

@implementation ABI39_0_0EXUpdatesSelectionPolicies

+ (BOOL)doesUpdate:(ABI39_0_0EXUpdatesUpdate *)update matchFilters:(nullable NSDictionary *)filters
{
  if (!filters || !update.metadata) {
    return YES;
  }
  
  NSDictionary *updateMetadata = update.metadata[@"updateMetadata"];
  if (!updateMetadata || ![updateMetadata isKindOfClass:[NSDictionary class]]) {
    return YES;
  }
  
  // create lowercase copy for case-insensitive search
  NSMutableDictionary *metadataLCKeys = [NSMutableDictionary dictionaryWithCapacity:updateMetadata.count];
  [updateMetadata enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
    if ([key isKindOfClass:[NSString class]]) {
      metadataLCKeys[((NSString *)key).lowercaseString] = obj;
    }
  }];
  
  __block BOOL passes = YES;
  [filters enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
    id valueFromManifest = metadataLCKeys[key];
    if (valueFromManifest) {
      passes = [obj isEqual:valueFromManifest];
    }
    
    // once an update fails one filter, break early; we don't need to check the rest
    if (!passes) {
      *stop = YES;
    }
  }];
  
  return passes;
}

@end

NS_ASSUME_NONNULL_END
