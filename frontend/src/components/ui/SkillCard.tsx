import { motion } from 'framer-motion';

interface SkillCardProps {
  category: string;
  skills: { name: string; level: number }[];
  index: number;
}

export function SkillCard({ category, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel rounded-2xl p-6"
    >
      <h3 className="mb-6 text-lg font-bold tracking-tight">{category}</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-text-muted">{skill.name}</span>
              <span className="text-text-muted">{skill.level}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
