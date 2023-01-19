package com.maintenance.board.domain.member;

import com.maintenance.board.domain.Board.Board;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Table(name ="member")
public class Member {

    @Id
    @Column(name = "member_id", unique = true, nullable = false)
    private String id;

    @Column(nullable = false)
    private String facility;

    @Column(nullable = false)
    private String siteName;

    @Column(nullable = false)
    private String siteAddress;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String callNo;

    @Column
    private String phoneNo;

    @Column
    private String faxNo;

    @Column
    private String email;

    @Column
    private String department;

    @Column
    private String position;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public Member(String id,String facility, String siteName, String siteAddress, String password, String name, String callNo, String phoneNo, String faxNo, String email, String department, String position) {
        this.id = id;
        this.facility = facility;
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.password = password;
        this.name = name;
        this.callNo = callNo;
        this.phoneNo = phoneNo;
        this.faxNo = faxNo;
        this.email = email;
        this.department = department;
        this.position = position;
        this.role = Role.USER;
    }

    public void update(String siteName,String siteAddress, String password, String name, String callNo, String phoneNo, String faxNo, String email, String position, String department){
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.password = password;
        this.name = name;
        this.callNo = callNo;
        this.phoneNo = phoneNo;
        this.faxNo = faxNo;
        this.email = email;
        this.position = position;
        this.department = department;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
