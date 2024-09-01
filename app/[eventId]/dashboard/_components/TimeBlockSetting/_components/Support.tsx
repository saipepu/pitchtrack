"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertTotalSectoHHMMSS } from '@/utils/convertor/convert-totalsec-to-hhmmss';
import React, { useEffect, useState } from 'react'

const Support = ({ slot, setSlot }: any) => {

  const [duration, setDuration] = useState({ minute: 0, second: 0, totalSeconds: 0 })
  const [warningTime, setWarningTime] = useState({ minute: 0, second: 0, totalSeconds: 0 })
  const [dangerTime, setDangerTime] = useState({ minute: 0, second: 0, totalSeconds: 0 })

  useEffect(() => {

    setDuration({
      minute: parseInt(convertTotalSectoHHMMSS(slot.duration).split(':')[1]),
      second: parseInt(convertTotalSectoHHMMSS(slot.duration).split(':')[2]),
      totalSeconds: slot.duration
    })
    setWarningTime({
      minute: parseInt(convertTotalSectoHHMMSS(slot.warningTime).split(':')[1]),
      second: parseInt(convertTotalSectoHHMMSS(slot.warningTime).split(':')[2]),
      totalSeconds: slot.warningTime
    })
    setDangerTime({
      minute: parseInt(convertTotalSectoHHMMSS(slot.dangerTime).split(':')[1]),
      second: parseInt(convertTotalSectoHHMMSS(slot.dangerTime).split(':')[2]),
      totalSeconds: slot.dangerTime
    })

  }, [])

  useEffect(() => {
    setSlot({ ...slot, warningTime: warningTime.totalSeconds, dangerTime: dangerTime.totalSeconds })
  }, [warningTime, dangerTime])


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

      <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-start items-center gap-2 md:gap-5 mb-2 md:mb-0'>

        {/* WARNING */}
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
              value={warningTime.minute.toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                if(e.target.value == '') e.target.value = '0'

                // IF THE WARNING TIME IS GREATER THAN OR EQUAL THE DURATION
                // SET THE WARNING TIME TO THE DURATION - 1 SECOND
                let totalSec = parseInt(e.target.value) * 60 + warningTime.second
                if(totalSec >= duration.totalSeconds) {
                  e.target.value = convertTotalSectoHHMMSS(duration.totalSeconds - 1).split(':')[1]
                  let second = convertTotalSectoHHMMSS(duration.totalSeconds - 1).split(':')[2]
                  setWarningTime({ ...warningTime, minute: parseInt(e.target.value), second: parseInt(second), totalSeconds: duration.totalSeconds - 1 })
                } else {
                  setWarningTime({ ...warningTime, minute: parseInt(e.target.value), second: warningTime.second, totalSeconds: totalSec })
                }

              }}
            />
            <span className='text-lg font-semibold mx-2'>:</span>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="MM"
              type="number"
              maxLength={3}
              value={warningTime.second.toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                if(e.target.value == '') e.target.value = '0'

                // IF THE WARNING TIME IS GREATER THAN 59 SET IT TO 59
                if(parseInt(e.target.value) > 59) {
                  e.target.value = '59'
                }

                // IF THE WARNING TIME IS GREATER THAN OR EQUAL THE DURATION
                // SET THE WARNING TIME TO THE DURATION - 1 SECOND                
                let totalSec = warningTime.minute * 60 + parseInt(e.target.value)
                if(totalSec >= duration.totalSeconds) {
                  e.target.value = convertTotalSectoHHMMSS(duration.totalSeconds - 1).split(':')[2]
                  let minute = convertTotalSectoHHMMSS(duration.totalSeconds - 1).split(':')[1]
                  setWarningTime({ ...warningTime, minute: parseInt(minute), second: parseInt(e.target.value), totalSeconds: duration.totalSeconds - 1 })
                } else {
                  setWarningTime({ ...warningTime, minute: warningTime.minute, second: parseInt(e.target.value), totalSeconds: totalSec })
                }

              }}
            />
          </div>
        </div>

        {/* CHIME */}
        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center md:justify-end px-2'>
            <Label htmlFor="warning">Chime</Label>
          </div>
          <div className='w-full col-span-1 border-0 flex justify-start items-center'>
            <Select>
              <SelectTrigger className='w-full px-2 bg-white border-none'>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black'>
                <SelectGroup>
                  <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value='1'>1</SelectItem>
                  <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value='2'>2</SelectItem>
                  <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value='3'>3</SelectItem>
                  <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value='4'>4</SelectItem>
                  <SelectItem onClick={(e) => e.stopPropagation()} className="cursor-pointer bg-white" value='5'>5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* FLASH */}
        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center md:justify-end px-2'>
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

      <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-start items-center gap-2 md:gap-5'>

        {/* DANGER */}
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
              value={dangerTime.minute.toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                if(e.target.value == '') e.target.value = '0'

                // IF THE DANGER TIME IS GREATER THAN OR EQUAL THE WARNING TIME
                // SET THE DANGER TIME TO THE WARNING TIME - 1 SECOND
                let totalSec = parseInt(e.target.value) * 60 + dangerTime.second
                if(totalSec >= warningTime.totalSeconds) {
                  e.target.value = convertTotalSectoHHMMSS(warningTime.totalSeconds - 1).split(':')[1]
                  let second = convertTotalSectoHHMMSS(warningTime.totalSeconds - 1).split(':')[2]
                  setDangerTime({ ...dangerTime, minute: parseInt(e.target.value), second: parseInt(second), totalSeconds: warningTime.totalSeconds - 1 })
                } else {
                  setDangerTime({ ...dangerTime, minute: parseInt(e.target.value), second: dangerTime.second, totalSeconds: totalSec })
                }

              }}
            />
            <span className='text-lg font-semibold mx-2'>:</span>
            <Input
              className="text-center w-full col-span-3 p-1 px-2 border-0 bg-white"
              id="MM"
              type="number"
              maxLength={3}
              value={dangerTime.second.toString().padStart(2, '0')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                if(e.target.value == '') e.target.value = '0'
                
                // IF THE DANGER TIME IS GREATER THAN 59 SET IT TO 59
                if(parseInt(e.target.value) > 59) {
                  e.target.value = '59'
                }

                // IF THE DANGER TIME IS GREATER THAN OR EQUAL THE WARNING TIME
                // SET THE DANGER TIME TO THE WARNING TIME - 1 SECOND
                let totalSec = dangerTime.minute * 60 + parseInt(e.target.value)
                if(totalSec >= warningTime.totalSeconds) {
                  e.target.value = convertTotalSectoHHMMSS(warningTime.totalSeconds - 1).split(':')[2]
                  let minute = convertTotalSectoHHMMSS(warningTime.totalSeconds - 1).split(':')[1]
                  setDangerTime({ ...dangerTime, minute: parseInt(minute), second: parseInt(e.target.value), totalSeconds: warningTime.totalSeconds - 1 })
                } else {
                  setDangerTime({ ...dangerTime, minute: dangerTime.minute, second: parseInt(e.target.value), totalSeconds: totalSec })
                }

              }}
            />
          </div>
        </div>

        {/* CHIME */}
        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center md:justify-end px-2'>
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

        {/* FLASH */}
        <div className='col-span-1 w-full grid grid-cols-2 items-center'>
          <div className='col-span-1 flex items-center md:justify-end px-2'>
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