import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import TimeBlock from "./TimeBlock";
import { useToast } from "@/components/ui/use-toast";

let timers = [
    { name: 'Timer 1', duration: 60, start: false },
    { name: 'Timer 2', duration: 120, start: false },
    { name: 'Timer 3', duration: 180, start: false },
  ]

const SortablePreset = () => {
  return (
    <div className='w-full flex justify-start items-start'>
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex w-full gap-3 ">
      <Column
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }: any) => {
  
  const [active, setActive] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("type", "timer");
  };

  const handleDragEnd = (e: any) => {

    setActive(false);
    clearHighlights();
    if(e.dataTransfer.getData("type") !== "timer") return;
    console.log('timer sorted')

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
        title: "Timer Sorted",
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

  const filteredCards = cards.filter((c: any) => c.column === column);

  return (
    <div className="w-full shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors`}
      >
        {filteredCards.map((c: any, i: any) => {
          return <Card key={c.id} timer={c.timer} {...c} handleDragStart={handleDragStart} i={i} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, timer, column, handleDragStart, i}: any) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab active:cursor-grabbing"
      >
        <TimeBlock timer={timer} i={i} />
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-1 w-full bg-violet-400 opacity-0"
    />
  );
};

const AddCard = ({ column, setCards, cards }: any) => {

  return (
    <>
      <motion.button
          layout
          onClick={() => {
            console.log(cards)
            setCards([
              ...cards,
              {
                id: `${Date.now()}`,
                column,
                timer: { name: 'Timer 4', duration: 240, start: false }
              },
            ])
          }}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-slate-500"
      >
          <span>Add card</span>
          <FiPlus />
      </motion.button>
    </>
  );
};

const DEFAULT_CARDS = [
  // BACKLOG
  { id: "1", column: "backlog", timer: timers[0]},
  { id: "2", column: "backlog", timer: timers[1]},
  { id: "3", column: "backlog", timer: timers[2]},
];

export default SortablePreset;