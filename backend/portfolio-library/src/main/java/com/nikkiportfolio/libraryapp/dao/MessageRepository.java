package com.nikkiportfolio.libraryapp.dao;


import com.nikkiportfolio.libraryapp.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);

    //Admin need to see the messages that have not yet response
    Page<Message> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);
}
