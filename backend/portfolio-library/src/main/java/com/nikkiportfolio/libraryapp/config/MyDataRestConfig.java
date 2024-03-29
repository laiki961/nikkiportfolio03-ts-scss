package com.nikkiportfolio.libraryapp.config;

import com.nikkiportfolio.libraryapp.entity.Book;
import com.nikkiportfolio.libraryapp.entity.Message;
import com.nikkiportfolio.libraryapp.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // this will enable us to send request to our frontend
    private String theAllowedOriginAWS = "http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com";
    private String theAllowedOrigin = "http://localhost:3000";
    private String theAllowedOriginCloudFront ="https://d1u8ufdpmtpp72.cloudfront.net";


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class, config, theUnsupportedActions);
        disableHttpMethods(Message.class, config, theUnsupportedActions);

//        Configure CORS Mapping
        cors.addMapping((config.getBasePath() + "/**"))
                .allowedOrigins(theAllowedOriginAWS, theAllowedOrigin, theAllowedOriginCloudFront);
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
