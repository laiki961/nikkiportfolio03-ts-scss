package com.nikkiportfolio.restaurant.config;

import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import com.nikkiportfolio.restaurant.domain.entity.ReservationEntity;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOriginAWS = "http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com";
    private String theAllowedOrigin = "http://lcoalhost:3000";



    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };
        config.exposeIdsFor(ProductEntity.class);
        config.exposeIdsFor(ReservationEntity.class);


        disableHttpMethods(ProductEntity.class, config, theUnsupportedActions);
        disableHttpMethods(ReservationEntity.class, config, theUnsupportedActions);

//        Configure CORS Mapping
        cors.addMapping((config.getBasePath() + "/**"))
                .allowedOrigins(theAllowedOriginAWS, theAllowedOrigin);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}
