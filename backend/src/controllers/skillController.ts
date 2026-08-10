import { Request, Response } from 'express';
import Skill from '../models/Skill';

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find({}).sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = new Skill(req.body);
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: 'Invalid skill data' });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      Object.assign(skill, req.body);
      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const reorderSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skills } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      res.status(400).json({ message: 'Invalid skills array' });
      return;
    }

    const updatePromises = skills.map((item: { id: string, order: number }) => 
      Skill.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);
    res.json({ message: 'Skills reordered' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      await skill.deleteOne();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
