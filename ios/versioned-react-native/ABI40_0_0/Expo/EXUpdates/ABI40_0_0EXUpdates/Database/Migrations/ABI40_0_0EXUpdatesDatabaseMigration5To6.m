//  Copyright © 2021 650 Industries. All rights reserved.

#import <ABI40_0_0EXUpdates/ABI40_0_0EXUpdatesDatabaseMigration5To6.h>

NS_ASSUME_NONNULL_BEGIN

static NSString * const ABI40_0_0EXUpdatesDatabaseV5Filename = @"expo-v5.db";

@implementation ABI40_0_0EXUpdatesDatabaseMigration5To6

- (NSString *)filename
{
  return ABI40_0_0EXUpdatesDatabaseV5Filename;
}

- (BOOL)runMigrationOnDatabase:(struct sqlite3 *)db error:(NSError ** _Nullable)error
{
  return NO;
}

@end

NS_ASSUME_NONNULL_END
