import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

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

import { AnimalCardSchema, AnimalCardSchemaDto } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { ALL_KEYWORDS, KeyWord } from '@/types/KeyWords';
import { SpecialEnclosureType } from '@/types/SpecialEnclosure';
import { allCardTags, allRequirements, Tag } from '@/types/Tags';

type AnimalCardFormProps = {
  defaultValues?: AnimalCardSchemaDto;
  isResetting?: boolean;
  onValuesChange: (values: AnimalCardSchemaDto) => void;
};
export const AnimalCardForm = ({
  defaultValues,
  isResetting,
  onValuesChange,
}: AnimalCardFormProps) => {
  const { t } = useTranslation();
  const form = useForm<AnimalCardSchemaDto>({
    resolver: zodResolver(AnimalCardSchema),
    defaultValues: defaultValues || {
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

  const [displayModes, setDisplayModes] = useState<string[]>([]); // "new" or "exist"

  const addNewAbility = () => {
    abilitiesAppend({
      keyword: KeyWord.fromObject({ name: '', descriptionTemplate: '' }),
      value: '',
    });
    setDisplayModes((prev) => [...prev, 'new']);
  };

  const addExistingAbility = () => {
    abilitiesAppend({ keyword: KeyWord.CLEVER, value: 1 });

    // abilitiesAppend({ keyword: KeyWord.fromObject(KeyWord.CLEVER.toObject()), value: 1 })
    setDisplayModes((prev) => [...prev, 'exist']);
  };

  // FIXME: it's a system bug and I don't know how to fix it. Temporary setting a warning for users.
  function hasExistBeforeNew(displayModes: string[], index: number): boolean {
    if (displayModes[index] === 'new') return false;
    const newIndex = displayModes
      .slice(index, displayModes.length)
      .indexOf('new');
    return newIndex >= 0;
  }

  useEffect(() => {
    if (isResetting && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isResetting, defaultValues, form]);

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

  const exportToJson = () => {
    const tmp = values;
    tmp.image = ''; // FIXME: data storage?
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tmp));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'animal.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('diy.animal_name')}</FormLabel>
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
                    className='border--1 w-10 rounded-lg border border-zinc-200 p-2'
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
            {t('diy.add_new_enclosure')}
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
                        className='border--1 w-10 rounded-lg border border-zinc-200 p-2'
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
                        className='border--1 w-10 rounded-lg border border-zinc-200 p-2'
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
              {displayModes[index] === 'exist' ? (
                <>
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
                  />{' '}
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name={`abilities.${index}.keyword.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && 'sr-only')}>
                          {t('Keyword')}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='keyword' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`abilities.${index}.keyword.descriptionTemplate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && 'sr-only')}>
                          {t('Description')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='description'
                            onKeyPress={(
                              e: React.KeyboardEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) => {
                              e.key === 'Enter' && e.preventDefault();
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormItem>
                <FormLabel className={cn(index !== 0 && 'sr-only')}>
                  Delete
                </FormLabel>
                <FormControl>
                  <button
                    type='button'
                    className='border--1 w-10 rounded-lg border border-zinc-200 p-2'
                    onClick={() => {
                      if (hasExistBeforeNew(displayModes, index)) {
                        alert(t('diy.bug'));
                        return;
                      }
                      abilitiesRemove(index);
                      setDisplayModes((prev) =>
                        prev.filter((_, idx) => idx !== index)
                      );
                    }}
                  >
                    X
                  </button>
                </FormControl>
              </FormItem>
            </div>
          ))}
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2 w-1/2'
              onClick={addNewAbility}
            >
              {t('diy.add_new_ability')}
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2 w-1/2'
              onClick={addExistingAbility}
            >
              {t('diy.add_exist_ability')}
            </Button>
          </div>
        </div>
        {/*{hasExistBeforeNew(displayModes) && <Alert variant="destructive">*/}
        {/*    <AlertCircle className="h-4 w-4" />*/}
        {/*    <AlertTitle>Error</AlertTitle>*/}
        {/*    <AlertDescription>*/}
        {/*        {t('diy.bug')}*/}
        {/*    </AlertDescription>*/}
        {/*</Alert>}*/}

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
        <Button variant='outline' type='submit'>
          {t('diy.export_json')}
        </Button>
      </form>
    </Form>
  );

  function onSubmit() {
    exportToJson();
  }
};
