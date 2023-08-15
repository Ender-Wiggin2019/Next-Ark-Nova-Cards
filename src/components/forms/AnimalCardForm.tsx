import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import TagButton from '@/components/buttons/TagButton';
import TagDiv from '@/components/icons/TagDiv';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import { AnimalCardSchema } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { ALL_KEYWORDS, KeyWord } from '@/types/KeyWords';
import { SpecialEnclosureType } from '@/types/SpecialEnclosure';
import { allCardTags, allRequirements, Tag } from '@/types/Tags';

type AnimalCardFormProps = {
  onValuesChange: (values: z.infer<typeof AnimalCardSchema>) => void;
};
export const AnimalCardForm = ({ onValuesChange }: AnimalCardFormProps) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof AnimalCardSchema>>({
    resolver: zodResolver(AnimalCardSchema),
    defaultValues: {
      id: 'FAN',
      name: '',
      latinName: '',
      image: '',
      size: 1,
      rock: 0,
      water: 0,
      price: 0,
      requirements: [],
      tags: [],
      specialEnclosures: [],
      abilities: [],
      description: '',
      reefDwellerEffect: [],
      soloEffect: [],
      reputation: 0,
      appeal: 0,
      conservationPoint: 0,
      wave: false,
      canBeInStandardEnclosure: true,
      source: CardSource.FAN_MADE,
    },
  });

  const values = form.watch();

  useEffect(() => {
    onValuesChange(values);
  }, [values, onValuesChange]);

  const {
    fields: specialEnclosuresField,
    append: specialEnclosuresAppend,
    remove: specialEnclosuresRemove,
  } = useFieldArray({
    control: form.control,
    name: 'specialEnclosures',
  });

  const {
    fields: abilitiesField,
    append: abilitiesAppend,
    remove: abilitiesRemove,
  } = useFieldArray({
    control: form.control,
    name: 'abilities',
  });

  // const { fields: tagsFields, append: tagsAppend, remove: tagsRemove } = useFieldArray({
  //     control: form.control,
  //     name: "tags",
  // });
  //
  // const { fields: requirementsField, append: requirementsAppend, remove: requirementsRemove } = useFieldArray({
  //     control: form.control,
  //     name: "requirements",
  // });

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<Tag[]>([]);
  const clearTags = () => {
    setSelectedTags([]);
  };
  const clearRequirements = () => {
    setSelectedRequirements([]);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Animal Name')}</FormLabel>
              <FormControl>
                <Input placeholder='name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Image')}</FormLabel>
              <FormControl>
                <Input
                  id='picture'
                  type='file'
                  value=''
                  onChange={(e) => {
                    if (e.target.files)
                      return field.onChange(
                        URL.createObjectURL(e.target.files[0])
                      );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex-row-2 flex gap-4'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Cost')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='price'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || '0' || '0')
                    }
                  />
                </FormControl>
                {/*<FormDescription>*/}
                {/*    This is your public display name.*/}
                {/*</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='appeal'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Appeal')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='appeal'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || '0')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='reputation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Reputation')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='reputation'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || '0')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='conservationPoint'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Conservation')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='conservationPoint'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || '0')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='size'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('Size')} ({field.value})
              </FormLabel>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(numbers) => field.onChange(numbers[0])}
                  className='w-full'
                  color='zinc'
                />
              </FormControl>
              {/*<FormDescription>*/}
              {/*    Now the value is {field.value}*/}
              {/*</FormDescription>*/}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full flex-row gap-4'>
          <FormField
            control={form.control}
            name='rock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('Rock')} ({field.value})
                </FormLabel>
                <FormControl>
                  <Slider
                    value={[field.value || 0]}
                    min={0}
                    max={2}
                    step={1}
                    onValueChange={(numbers) => field.onChange(numbers[0])}
                    className='w-full'
                    color='amber'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='water'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('Water')} ({field.value})
                </FormLabel>
                <FormControl>
                  <Slider
                    value={[field.value || 0]}
                    min={0}
                    max={2}
                    step={1}
                    onValueChange={(numbers) => field.onChange(numbers[0])}
                    className='w-full'
                    color='blue'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {specialEnclosuresField.map((field, index) => (
            <div key={field.id} className='flex w-full flex-row gap-4'>
              <FormField
                control={form.control}
                name={`specialEnclosures.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      {t('Special Enclosures')}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id='Special Enclosure' className='w-48'>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position='popper'>
                        {Object.values(SpecialEnclosureType).map(
                          (enclosure) => (
                            <SelectItem key={enclosure} value={enclosure}>
                              {enclosure}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`specialEnclosures.${index}.size`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      {t('Size')} ({field.value})
                    </FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(numbers) => field.onChange(numbers[0])}
                        className='w-16'
                        color='zinc'
                      />
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*    Now the value is {field.value}*/}
                    {/*</FormDescription>*/}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className={cn(index !== 0 && 'sr-only')}>
                  {' '}
                  {t('Delete')}
                </FormLabel>
                <FormControl>
                  <button
                    type='button'
                    className='border-1 w-10 rounded-lg border border-zinc-200 p-2'
                    onClick={() => specialEnclosuresRemove(index)}
                  >
                    X
                  </button>
                </FormControl>
              </FormItem>
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() =>
              specialEnclosuresAppend({
                type: SpecialEnclosureType.PettingZoo,
                size: 0,
              })
            }
          >
            {t('Add New Enclosure')}
          </Button>
        </div>

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => {
            const handleTagClick = (tag: Tag) => {
              setSelectedTags((prevTags) => {
                if (prevTags.length >= 3) {
                  prevTags.shift();
                }
                const newTags = [...prevTags, tag];
                field.onChange(newTags); // 在这里更新React Hook Form的字段值
                return newTags;
              });
            };

            return (
              <FormItem>
                <FormLabel>{t('Tags')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value[0]}
                >
                  <FormControl>
                    <div className='flex flex-row gap-4'>
                      <SelectTrigger id='tags' className='w-48'>
                        {/*<SelectValue placeholder="Select" />*/}
                        {selectedTags.map((tag, index) => (
                          <div key={index} className='-mx-6 -my-3 scale-[0.5]'>
                            <TagDiv tag={tag} selected={false} />
                          </div>
                        ))}
                      </SelectTrigger>
                      <button
                        type='button'
                        className='border-1 w-10 rounded-lg border border-zinc-200 p-2'
                        onClick={clearTags}
                      >
                        X
                      </button>
                    </div>
                  </FormControl>
                  <SelectContent position='popper'>
                    <div className='grid grid-cols-3 gap-2'>
                      {allCardTags.map((tag) => (
                        <div key={tag} className='-m-3 scale-[0.7]'>
                          <TagButton
                            tag={tag}
                            selected={false}
                            onTagClick={handleTagClick}
                          />
                        </div>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='requirements'
          render={({ field }) => {
            const handleTagClick = (tag: Tag) => {
              setSelectedRequirements((prevTags) => {
                if (prevTags.length >= 3) {
                  prevTags.shift();
                }
                const newTags = [...prevTags, tag];
                field.onChange(newTags); // 在这里更新React Hook Form的字段值
                return newTags;
              });
            };

            return (
              <FormItem>
                <FormLabel>{t('Requirements')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value[0] : undefined}
                >
                  <FormControl>
                    <div className='flex flex-row gap-4'>
                      <SelectTrigger id='tags' className='w-48'>
                        {/*<SelectValue placeholder="Select" />*/}
                        {selectedRequirements.map((tag, index) => (
                          <div key={index} className='-mx-6 -my-3 scale-[0.5]'>
                            <TagDiv tag={tag} selected={false} />
                          </div>
                        ))}
                      </SelectTrigger>
                      <button
                        type='button'
                        className='border-1 w-10 rounded-lg border border-zinc-200 p-2'
                        onClick={clearRequirements}
                      >
                        X
                      </button>
                    </div>
                  </FormControl>
                  <SelectContent position='popper'>
                    <div className='grid grid-cols-3 gap-2'>
                      {allRequirements.map((tag) => (
                        <div key={tag} className='-m-3 scale-[0.7]'>
                          <TagButton
                            tag={tag}
                            selected={false}
                            onTagClick={handleTagClick}
                          />
                        </div>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div>
          {abilitiesField.map((field, index) => (
            <div key={field.id} className='flex w-full flex-row gap-4'>
              <FormField
                control={form.control}
                name={`abilities.${index}.keyword`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Abilities
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(
                          ALL_KEYWORDS.find((kw) => kw.name === value)
                        );
                      }}
                      defaultValue={field.value.name}
                    >
                      <FormControl>
                        <SelectTrigger id='Abilities' className='w-48'>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position='popper' className='h-48'>
                        {ALL_KEYWORDS.map((keyword, index) => (
                          <SelectItem key={index} value={keyword.name}>
                            {t(keyword.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`abilities.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Value
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='value' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className={cn(index !== 0 && 'sr-only')}>
                  {' '}
                  Delete
                </FormLabel>
                <FormControl>
                  <button
                    type='button'
                    className='border-1 w-10 rounded-lg border border-zinc-200 p-2'
                    onClick={() => abilitiesRemove(index)}
                  >
                    X
                  </button>
                </FormControl>
              </FormItem>
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() =>
              abilitiesAppend({ keyword: KeyWord.CLEVER, value: 1 })
            }
          >
            {t('Add New Ability')}
          </Button>
        </div>

        <FormField
          control={form.control}
          name='canBeInStandardEnclosure'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>
                  {t('Enclosure Setting')}
                </FormLabel>
                <FormDescription>
                  Define whether this animal can be in standard enclosures
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='wave'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>{t('Wave')}</FormLabel>
                <FormDescription>
                  Usually all sea animals should have wave ability
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>This function is still in beta.</AlertDescription>
        </Alert>
        {/*<Button type="submit">Submit</Button>*/}

        {/*<div className="w-full flex">*/}
        {/*    <div className="w-1/2">*/}
        {/*        <h3>Last submitted values:</h3>*/}
        {/*        <code>{JSON.stringify(form.getValues())}</code>*/}
        {/*    </div>*/}
        {/*</div>*/}
      </form>
    </Form>
  );

  function onSubmit(values: z.infer<typeof AnimalCardSchema>) {
    console.log(values);
    // Handle the form submission...
  }
};
