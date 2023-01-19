package com.maintenance.board.domain.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST", "손님"),
    USER("ROLE_USER", "사용자"),
    MANAGER("ROLE_MANGER", "관리자"),
    ADMIN("ROLE_ADMIN", "어드민");


    private final String key;
    private final String title;

}
