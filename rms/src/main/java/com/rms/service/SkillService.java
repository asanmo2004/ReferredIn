package com.rms.service;

import com.rms.model.Skill;
import com.rms.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill getSkillById(Integer id) {
        return skillRepository.findById(id).orElse(null);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}
