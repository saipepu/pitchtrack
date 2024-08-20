"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import MessageEditor from "./MessageEditor";
import { useToast } from "@/components/ui/use-toast";
import { SlotContext } from "@/app/hooks/SlotContext";

const MessageSortableList = () => {

  const { messages, setMessages } = useContext(SlotContext);

  return (
    <div className='w-full flex flex-col justify-start items-start'>
      <Column cards={messages} setCards={setMessages} column="backlog"/>
    </div>
  )
}

const Column = ({ cards, setCards, column }: any) => {

  const { toast } = useToast();
  const [active, setActive] = useState(false);

  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("type", "message");
  };

  const handleDragEnd = (e: any) => {

    setActive(false);
    clearHighlights();
    if(e.dataTransfer.getData("type") !== "message") return;
    console.log('message sorted')

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      toast({
        title: "Message Sorted"
      })

      setCards(copy);
    }

  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: any) => {

    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <div className='flex flex-col w-full gap-3 '>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors`}
      >
        {cards.map((message: any, i: any) => {
          return (
            <div key={i}>
              <DropIndicator beforeId={message.id} column={column}/>
              <motion.div
                layout
                layoutId={message.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { id: message.id })}
                className="cursor-grab active:cursor-grabbing"
                data-cardtype="message"
              >
                <MessageEditor i={i} setMessages={setCards} message={message} key={i} />
              </motion.div>
            </div>
          )
        })}
      </div>
      <DropIndicator beforeId={null} column={column}/>
    </div>
  )
}

const DropIndicator = ({ beforeId, column }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-1 w-full bg-violet-400 opacity-0"
    />
  );
};

export default MessageSortableList