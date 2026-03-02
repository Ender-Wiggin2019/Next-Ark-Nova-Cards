import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { PROJECT_BONUSES } from '@/data/ProjectBonuses';

type Props = {};

export default function ProjectBonusPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { t, i18n } = useTranslation('common');
  const isZhCN = i18n.language === 'zh-CN' || i18n.language === 'zh';

  return (
    <Layout>
      <Seo templateTitle='Project Bonus' />

      <div className='flex flex-col gap-6 px-3 py-3 md:px-5'>
        <h1 className='text-2xl font-bold text-foreground'>
          {t('project_bonus.title', '保护项目奖励')}
        </h1>

        <p className='text-sm text-foreground/70'>
          {t(
            'project_bonus.description',
            '整理了保护项目奖励图标及说明，支持中英文显示。',
          )}
        </p>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {PROJECT_BONUSES.map((item) => (
            <div
              key={item.id}
              className='rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm'
            >
              <div className='flex items-center gap-3'>
                <div className='relative h-14 w-14 flex-shrink-0 rounded-md border border-border/50 bg-background/80 p-1'>
                  <Image
                    src={item.image}
                    alt={isZhCN ? item.title.zhCN : item.title.en}
                    fill
                    className='object-contain p-1'
                    sizes='56px'
                  />
                </div>
                <h2 className='text-base font-semibold text-foreground'>
                  {isZhCN ? item.title.zhCN : item.title.en}
                </h2>
              </div>

              <p className='mt-3 text-sm leading-relaxed text-foreground/80'>
                {isZhCN ? item.description.zhCN : item.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
