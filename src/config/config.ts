export const Configuration = () => {
  const environment = process.env.ENVIRONMENT;
  const configRegistry = process.env.CONFIG_REGISTRY;
  const esApi = process.env.ES_API;

  const exposedConf = {
    environment: environment,
    baseUrl: '',
    baseEndpoint: 'article-feeds',
    pagesPath: `${esApi}/pages/_search`,
    configRegistryPath: `${configRegistry}/config/`,
  };

  return exposedConf;
};
