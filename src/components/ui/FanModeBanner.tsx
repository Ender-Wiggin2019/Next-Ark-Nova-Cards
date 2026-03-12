/*
 * @Author: Ender Wiggin
 * @Date: 2026-02-22 02:07:50
 * @LastEditors: Ender Wiggin
 * @LastEditTime: 2026-02-22 02:14:21
 * @Description:
 */
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
export const FanModeBanner: React.FC = () => {
  return (
    <Alert className='my-3 border-border bg-secondary/70 text-foreground'>
      <AlertDescription className='text-center'>
        目前你使用的是<span className='font-bold'>粉丝扩展预览模式</span>
        ，对于史前纪元扩展，欢迎联系 QQ{' '}
        <span className='font-bold underline'>2363637833</span> 咨询更多信息。
      </AlertDescription>
    </Alert>
  );
};
