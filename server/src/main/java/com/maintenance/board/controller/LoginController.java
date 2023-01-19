package com.maintenance.board.controller;

import com.maintenance.board.Service.LoginService;
import com.maintenance.board.Service.MemberService;
import com.maintenance.board.domain.member.Member;
import com.maintenance.board.dto.Login.LoginCheckRequestDto;
import com.maintenance.board.dto.Login.LoginCheckResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class LoginController  {
    private final LoginService loginService;

    @PostMapping("/api/login/check")
    public LoginCheckResponseDto loginCheck(@RequestBody LoginCheckRequestDto requestDto) {
        return loginService.LoginCheck(requestDto);
    }
}
