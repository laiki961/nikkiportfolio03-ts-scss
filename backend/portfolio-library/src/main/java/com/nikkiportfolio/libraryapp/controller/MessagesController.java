package com.nikkiportfolio.libraryapp.controller;

import com.nikkiportfolio.libraryapp.entity.Message;
import com.nikkiportfolio.libraryapp.requestmodels.AdminQusetionRequest;
import com.nikkiportfolio.libraryapp.service.MessagesService;
import com.nikkiportfolio.libraryapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com","http://localhost:3000", "https://d1tixx1eh3q5bb.cloudfront.net"})
@RestController
@RequestMapping("library/api/messages")
public class MessagesController {
    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token,
                           @RequestBody AdminQusetionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        messagesService.putMessage(adminQuestionRequest, userEmail);
    }

}
