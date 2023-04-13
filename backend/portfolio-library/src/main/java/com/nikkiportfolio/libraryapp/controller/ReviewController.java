package com.nikkiportfolio.libraryapp.controller;

import com.nikkiportfolio.libraryapp.requestmodels.ReviewRequest;
import com.nikkiportfolio.libraryapp.service.ReviewService;
import com.nikkiportfolio.libraryapp.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com","http://localhost:3000"})
@RestController
@RequestMapping("library/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController (ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value="Authorization") String token,
                                    @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}
