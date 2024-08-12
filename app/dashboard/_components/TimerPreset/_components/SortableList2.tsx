import { SlotContext } from '@/app/dashboard/hook'
import React, { useContext } from 'react'
import TimeBlock from './TimeBlock'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const SortableList2 = ({ tag } : { tag: string }) => {

  const { slots, setSlots } = useContext(SlotContext)

  return (
    <div className='w-full flex justify-start items-start overflow-y-scroll md:pb-[50px]'>
      <Board slots={slots} setSlots={setSlots} tag={tag} />
    </div>
  )

}

const Board = ({ slots, setSlots, tag } : any ) => {

  return (
    <div className="flex w-full">
      <Column
        tag={tag}
        cards={slots}
        setCards={setSlots}
      />
    </div>
  )
}

const Column = ({ tag, cards, setCards }: any) => {

  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.id)
    e.dataTransfer.setData("tag", "timeslot")
  }

  const handleDragOver = (e: any) => {

    e.preventDefault()
    highlightIndicator(e);

  }

  const highlightIndicator = (e: any) => {

    const indicators = getIndicators();

    clearHighlights(indicators);

    const indicator = getNearestIndicator(e, indicators);

    indicator.element.style.backgroundColor = "red";

  }

  const clearHighlights = (indicators?: any) => {

    const els = indicators || getIndicators();

    els.forEach((indicator: any) => {
      indicator.style.backgroundColor = "transparent";
    })
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-tag=${tag}]`))
  }

  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const indicator = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if(offset < 0 && offset > closest.offset)  {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1]
      }
    )

    return indicator;
  }

  const handleDragLeave = () => {
    clearHighlights();
  }

  const handleDrop = (e: any) => {

    clearHighlights();
    console.log(e.dataTransfer)
    if(e.dataTransfer.getData("tag") !== "timeslot") return;

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, tag };

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

  const filteredCards = cards.filter((card: any) => card.tag == tag)

  return (
    <div
      className="w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {filteredCards.map((card: any, i: any) => {

        return (
          <Card
            tag={tag}
            key={i}
            card={card}
            setCards={setCards}
            currentSlot={i}
            handleDragStart={handleDragStart}
          />
        )
      })}
      <DropIndicator beforeId={null} tag={tag} />
      <AddCard column={tag} setCards={setCards} cards={cards} />
    </div>
  )
}

const Card = ({ tag, card, setCards, currentSlot, handleDragStart }: any) => {

    return (
      <>
      <DropIndicator beforeId={card.id} tag={card.tag}/>
      <div
        id={`${tag}-${card.id}`}
        draggable={true}
        className="cursor-grab active:cursor-grabbing"
        onDragStart={(e) => {
          handleDragStart(e, card)
        }}
      >
        <TimeBlock card={card} setCards={setCards} currentSlot={currentSlot} handleDragStart={handleDragStart} />
      </div>
      </>
    )
}

const DropIndicator = ({ beforeId, tag }: any) => {

  return (
    <div
      data-before={beforeId || "-1"}
      data-tag={tag}
      className="my-0.5 h-1 w-full bg-transparent"
    />
  )
}

const AddCard = ({ column, setCards, cards }: any) => {

  return (
    <>
      <Button
          onClick={() => {
            setCards([
              ...cards,
              {...cards[cards.length - 1], id: (cards.length+1).toString()}
            ])
          }}
          className="flex w-full justify-start items-center gap-1 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-slate-500"
      >
          <p>Add card</p>
          <Plus width={12} height={12} />
      </Button>
    </>
  );
};

export default SortableList2