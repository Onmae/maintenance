package com.maintenance.board.Service;

import com.maintenance.board.domain.member.Member;
import com.maintenance.board.domain.member.MemberRepository;
import com.maintenance.board.dto.Login.LoginCheckRequestDto;
import com.maintenance.board.dto.Login.LoginCheckResponseDto;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginService {
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public LoginCheckResponseDto LoginCheck(LoginCheckRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getId())
                .filter(m -> m.getPassword().equals(requestDto.getPassword()))
                .orElse(null);

        LoginCheckResponseDto loginCheckResponseDto = null;

        if (member != null) {
            loginCheckResponseDto =
                    LoginCheckResponseDto.builder()
                            .id(member.getId())
                            .role(member.getRole())
                            .name(member.getName())
                            .facility(member.getFacility())
                            .idExists(true)
                            .build();
        }

        return loginCheckResponseDto;
    }
}
