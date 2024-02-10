'use client';

import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { CardWIthList } from '@/types';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  data: CardWIthList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: copyCardExecute, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );
  const { execute: deleteCardExecute, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data?.title}" deleted.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    copyCardExecute({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    deleteCardExecute({
      id: data.id,
      boardId,
    });
  };
  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        disabled={isLoadingCopy}
        variant='gray'
        className='w-full justify-start'
        size='inline'
        onClick={onCopy}
      >
        <Copy className='h-4 w-4 mr-2' />
        Copy
      </Button>
      <Button
        disabled={isLoadingDelete}
        onClick={onDelete}
        variant='gray'
        className='w-full justify-start'
        size='inline'
      >
        <Trash className='h-4 w-4 mr-2' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};
