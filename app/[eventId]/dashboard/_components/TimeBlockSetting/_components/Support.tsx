"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'

const Support = () => {

  const [hour, setHour] = React.useState('00')
  const [minute, setMinute] = React.useState('00')

  return (
    <>
      <div className='w-full flex justify-between items-center gap-2'>
        <p className='lg font-bold'>Support</p>
        <Button>Action</Button>
      </div>

      <div className='w-full h-[20px] flex justify-start items-center rounded-md overflow-hidden'>
        <div className={`bg-green h-full`} style={{ width: `80%`}}>
        </div>
        <div className={`bg-yellow h-full`} style={{ width: `15%`}}>
        </div>
        <div className={`bg-red h-full`} style={{ width: `5%`}}>
        </div>
      </div>

      <div className='w-full grid grid-flow-col grid-cols-3 justify-start items-center gap-5'>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center gap-1'>
            <div className='w-3 h-3 bg-yellow rounded-full'></div>
            <Label htmlFor="warning">Warning</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="HH"
              type="number"
              value={parseInt(hour).toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(parseInt(e.target.value) > 23) e.target.value = '23'
                if(e.target.value == '') e.target.value = '0'
                setHour(e.target.value)
              }}
            />
            <span className='text-lg font-semibold mx-2'>:</span>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="MM"
              type="number"
              maxLength={3}
              value={parseInt(minute).toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(parseInt(e.target.value) > 100) {
                  e.target.value = minute
                } else {
                  if(parseInt(e.target.value) > 59) e.target.value = '59'
                }
                if(e.target.value == '') e.target.value = '0'
                setMinute(e.target.value)
              }}
            />
          </div>
        </div>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center justify-end px-2'>
            <Label htmlFor="warning">Chime</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Select>
              <SelectTrigger className='w-full px-2 bg-white border-none'>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black'>
                <SelectGroup>
                  <SelectItem className="cursor-pointer bg-white" value='1'>1</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='2'>2</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='3'>3</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='4'>4</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='5'>5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center justify-end px-2'>
            <Label htmlFor="warning">Flash</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Select>
              <SelectTrigger className='w-full px-2 bg-white border-none'>
                <SelectValue placeholder="x0" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black'>
                <SelectGroup>
                  <SelectItem className="cursor-pointer bg-white" value='1'>1</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='2'>2</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='3'>3</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='4'>4</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='5'>5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>

      <div className='w-full grid grid-flow-col grid-cols-3 justify-start items-center gap-5'>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center gap-1'>
            <div className='w-3 h-3 bg-red rounded-full'></div>
            <Label htmlFor="warning">Danger</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="HH"
              type="number"
              value={parseInt(hour).toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(parseInt(e.target.value) > 23) e.target.value = '23'
                if(e.target.value == '') e.target.value = '0'
                setHour(e.target.value)
              }}
            />
            <span className='text-lg font-semibold mx-2'>:</span>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="MM"
              type="number"
              maxLength={3}
              value={parseInt(minute).toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(parseInt(e.target.value) > 100) {
                  e.target.value = minute
                } else {
                  if(parseInt(e.target.value) > 59) e.target.value = '59'
                }
                if(e.target.value == '') e.target.value = '0'
                setMinute(e.target.value)
              }}
            />
          </div>
        </div>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center justify-end px-2'>
            <Label htmlFor="warning">Chime</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Select>
              <SelectTrigger className='w-full px-2 bg-white border-none'>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black'>
                <SelectGroup>
                  <SelectItem className="cursor-pointer bg-white" value='1'>1</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='2'>2</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='3'>3</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='4'>4</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='5'>5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center justify-end px-2'>
            <Label htmlFor="warning">Flash</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Select>
              <SelectTrigger className='w-full px-2 bg-white border-none'>
                <SelectValue placeholder="x0" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black'>
                <SelectGroup>
                  <SelectItem className="cursor-pointer bg-white" value='1'>1</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='2'>2</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='3'>3</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='4'>4</SelectItem>
                  <SelectItem className="cursor-pointer bg-white" value='5'>5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>
    </>
  )
}

export default Support