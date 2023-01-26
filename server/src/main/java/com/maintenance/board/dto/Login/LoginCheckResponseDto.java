package com.maintenance.board.dto.Login;

import com.maintenance.board.domain.member.Member;
import com.maintenance.board.domain.member.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginCheckResponseDto {
    private String id;
    private Role role;
    private String name;
    private String facility;
    private String token;
    private Boolean idExists;

    @Builder
    public LoginCheckResponseDto(String id, Role role, String name, String token, String facility, Boolean idExists) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.facility = facility;
        this.token = token;
        this.idExists = idExists;
    }
}
