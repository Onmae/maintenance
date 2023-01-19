package com.maintenance.board.dto.Login;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginCheckRequestDto {
    private String id;
    private String password;

    @Builder
    public LoginCheckRequestDto(String id, String password) {
        this.id = id;
        this.password = password;
    }
}


