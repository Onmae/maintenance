package com.maintenance.board.domain.member;

import com.maintenance.board.domain.Board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, String> {
    List<Member> findAllByOrderByIdDesc();

    List<Member> findByRoleOrderByIdDesc(Role role);

    Member findByNameAndRole(String name,Role role);

    boolean existsById(String id);


    Member findMemberById(String id);
}
