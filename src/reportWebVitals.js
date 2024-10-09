const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Define a function to log metrics to analytics
      const logToAnalytics = ({ name, delta }) => {
        console.log(`${name}: ${delta} ms`);
        // Here you can send data to your analytics service
      };

      // Call logToAnalytics for each metric
      getCLS(logToAnalytics);
      getFID(logToAnalytics);
      getFCP(logToAnalytics);
      getLCP(logToAnalytics);
      getTTFB(logToAnalytics);
    });
  }
};

export default reportWebVitals;
