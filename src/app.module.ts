import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import typeOrmConfig from './config/postgressParams';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadENV } from './config';
import modules from './modules/modules';
import { AuthModule } from './modules/people/auth/auth.module';
import { GlobalModule } from './modules/globalModule';
import i18nOptions from './i18n/i18n';

const graphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',
  playground: true,
  sortSchema: true,
  context: ({ req }) => ({ req }),
});

const i18n = I18nModule.forRoot(i18nOptions);

@Module({
  imports: [
    loadENV,
    i18n,
    TypeOrmModule.forRoot(typeOrmConfig),
    graphQL,
    AuthModule,
    GlobalModule,
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
