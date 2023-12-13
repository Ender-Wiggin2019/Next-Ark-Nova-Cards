import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { cn } from '@/lib/utils';

import TagButton from '@/components/buttons/TagButton';

import {
  AnimalTag,
  ContinentTag,
  otherTagRequirements,
  Tag,
} from '@/types/Tags';

type RequirementFilterProps = {
  onFilterChange: (tags: Tag[]) => void;
  reset: boolean;
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, x: -100, transition: { duration: 0.2 } },
};

export const RequirementFilter: React.FC<RequirementFilterProps> = ({
  onFilterChange,
  reset,
}) => {
  const { t } = useTranslation('common');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(selectedTags);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // logic: and, or

  useEffect(() => {
    onFilterChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (reset) {
      setSelectedTags([]);
    }
  }, [reset]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className='menu'
      style={{ overflow: 'hidden' }} // 这里添加 overflow: hidden
    >
      <motion.button
        className={cn(
          'group mt-1 flex w-40 items-center justify-between space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
        )}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('Requirements')}
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <BiChevronDown className='h-4 w-4 opacity-50' />
        </motion.div>
      </motion.button>
      <motion.ul
        className='flex flex-wrap'
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            maxHeight: 520, // expand size
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.2,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(0% 50% 100% 50% round 10px)',
            maxHeight: 15, // collapse size
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {Object.values(AnimalTag).map((tag, index) => (
          <motion.li variants={itemVariants} key={index}>
            <TagButton
              tag={tag}
              onClick={() => toggleTag(tag)}
              selected={selectedTags.includes(tag)}
            />
          </motion.li>
        ))}

        {/*<LogicButton logic={} selected={} />*/}
        {Object.values(ContinentTag).map((tag, index) => (
          <motion.li variants={itemVariants} key={index}>
            <TagButton
              tag={tag}
              onClick={() => toggleTag(tag)}
              selected={selectedTags.includes(tag)}
            />
          </motion.li>
        ))}
        {otherTagRequirements.map((tag, index) => (
          <motion.li variants={itemVariants} key={index}>
            <TagButton
              tag={tag}
              onClick={() => toggleTag(tag)}
              selected={selectedTags.includes(tag)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};
