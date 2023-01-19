package com.maintenance.board.dto.Member;

import com.maintenance.board.domain.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class MemberChargedResponseDto {
    private final String name;
    private final String phoneNo;
    private final String email;

    public MemberChargedResponseDto(Member Entity) {
        this.name = Entity.getName();
        this.phoneNo = Entity.getPhoneNo();
        this.email = Entity.getEmail();
    }
}
