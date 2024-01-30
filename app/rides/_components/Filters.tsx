'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import {
  bikeTypesOptions,
  rideTypesOptions,
  sortOptions,
} from '@/lib/inputsOptions';

import { MultiSelect } from '@/components/ui/multiselect';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createSearchParamsURL } from '@/lib/utils';

interface FiltersProps {}

const Filters: FC<FiltersProps> = ({}) => {
  const searchParams = useSearchParams();
  const [rideType, setRideType] = useState<string[]>(
    searchParams.getAll('rideType')
  );
  const [bikeType, setBikeType] = useState<string[]>(
    searchParams.getAll('bikeType')
  );
  const [sort, setSort] = useState<string | undefined>(
    searchParams.get('sort') ?? undefined
  );
  const router = useRouter();
  const debouncedRideType = useDebounce(rideType, 1000);
  const debouncedBikeType = useDebounce(bikeType, 1000);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const currentSearchParams = Object.fromEntries(searchParams.entries());
    const updatedSearchParams = {
      ...currentSearchParams,
      rideType: debouncedRideType,
      bikeType: debouncedBikeType,
      ...(sort !== undefined && sort !== '' && { sort }),
      page: '1',
    };
    const newSearchParams = createSearchParamsURL(updatedSearchParams);
    router.push(`/rides?${newSearchParams}`);
  }, [debouncedRideType, debouncedBikeType, router, sort]);

  return (
    <div className="md:grid md:grid-cols-5 md:gap-x-2">
      <div className="md:col-span-2">
        <MultiSelect
          listData={rideTypesOptions}
          selected={rideType}
          setSelected={setRideType}
          placeholder="Select ride type..."
        />
      </div>
      <div className="md:col-span-2">
        <MultiSelect
          listData={bikeTypesOptions}
          selected={bikeType}
          setSelected={setBikeType}
          placeholder="Select bike type..."
        />
      </div>
      <div className="md:col-span-1">
        <Select onValueChange={setSort} defaultValue={sort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
