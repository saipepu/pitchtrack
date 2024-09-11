import { createMessage } from '@/app/_api/message';
import { createSlot } from '@/app/_api/slot';
import { SlotContext } from "@/app/hooks/SlotContext";
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import { useParams } from "next/navigation";
import { useContext } from 'react';
import MessageEditor from "./MessageList/_components/MessageEditor";
import TimeBlock from './TimerPreset/_components/TimeBlock';
import { reorderSlot } from '@/app/_api/slot';

let slotDefaultSchema = {
    "tag": "Tag1",
    "title": "Slot1",
    "speaker": "Speaker1",
    "notes": "Note1",
    "appearance": "countdown",
    "startTimeType": "manual",
    "startTime": new Date(),
    "duration": "300",
    "pauseTime": "300",
    "warningTime": "100",
    "dangerTime": "50",
    "warningColor": "yellow",
    "dangerColor": "red",
    "dangerSound": "danger",
    "warningSound": "warning",
    "flash": true,
    "flashCount": 3,
    "sortOrder": 1,
    "status": "active",
    "active": false
}
let messageDefaultSchema = {
  "tag": "Tag1",
  "desc": "Message1",
  "isCap": true,
  "onDisplay": true,
  "color": "green"
}

const SortableList = ({ tag } : { tag: string }) => {

  const { slots, setSlots, messages, setMessages } = useContext(SlotContext)

  return (
    <div className='w-full flex justify-start items-start overflow-y-scroll md:pb-[50px]'>
      {tag === 'timeslot' && <Board cards={slots} setCards={setSlots} tag={tag} />}
      {tag === 'message' && <Board cards={messages} setCards={setMessages} tag={tag} />}
    </div>
  )

}

const Board = ({ cards, setCards, tag } : any ) => {

  return (
    <div className="flex w-full">
      <Column
        tag={tag}
        cards={cards}
        setCards={setCards}
      />
    </div>
  )
}

const Column = ({ tag, cards, setCards }: any) => {

  const { eventId } = useParams();
  const handleReorderSlot = async ({ dto }: any) => {
    console.log('Saving slot', dto)
    const response = await reorderSlot({ eventId, dto })

      console.log(response.message.slots.map((slot: any, i: number) => slot._id))
      if(response.success) {
        console.log('Slot updated successfully')
        toast({
          title: "Slot updated successfully"
        })
      } else {
        console.log('Failed to update slot', response)
        toast({
          title: "Slot updated failed"
      })
    }
  }

  const handleDragStart = (e: any, card: any) => {
    console.log(card)
    e.dataTransfer.setData("cardId", card._id)
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
    if(e.dataTransfer.getData("tag") !== "timeslot") return;

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {

      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, tag };
      copy = copy.filter((c) => c._id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el._id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      toast({
        title: "Timer Sorted",
      })
      setCards(copy);


      // SORT SLOT API INTEGRATION
      handleReorderSlot({ dto: { newOrder: copy.map((slot: any, i: number) => slot._id)}})

    }
  };

  const filteredCards = cards?.filter((card: any) => card.tag == tag)

  return (
    <div
      className="w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {filteredCards?.map((card: any, i: any) => {

        return (
          <Card
            tag={tag}
            key={i}
            card={card}
            setCards={setCards}
            index={i}
            handleDragStart={handleDragStart}
          />
        )
      })}
      <DropIndicator beforeId={null} tag={tag} />
      <AddCard tag={tag} setCards={setCards} cards={cards} />
    </div>
  )
}

const Card = ({ tag, card, setCards, index, handleDragStart }: any) => {

    return (
      <>
      <DropIndicator beforeId={card._id} tag={card.tag}/>
      <div
        id={`${tag}-${card._id}`}
        draggable={true}
        className="cursor-grab active:cursor-grabbing"
        onDragStart={(e) => {
          handleDragStart(e, card)
        }}
      >
        {tag === 'timeslot' &&  <TimeBlock index={index} /> }
        {tag === 'message' && <MessageEditor message={card} setMessages={setCards} />}
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

const AddCard = ({ tag, setCards, cards }: any) => {

  const { eventId } = useParams();

  // CREATE NEW SLOT
  const createNewSlot = async (newSlot: any) => {

    const response = await createSlot({ eventId, slot: newSlot });

    console.log(response)

    if(response.success) {
      toast({
        title: "Slot created"
      })
      setCards([...cards, {...response.message.slots.pop(), tag: 'timeslot'}])
    } else {
      toast({
        title: "Failed to create slot"
      })
      console.log('Failed to create slot')
    }
    
  }
  
  // CREATE NEW MESSAGE
  const createNewMessage = async (newMessage: any) => {
    
    const response = await createMessage({ eventId, message: newMessage });
    
    console.log(response)
    
    if(response.success) {
      toast({
        title: "Message created"
      })
      setCards([...cards, {...response.message.messages.pop(), tag: 'message'}])
    } else {
      toast({
        title: "Failed to create message"
      })
      console.log('Failed to create message')
    }

  }

  const handleAddCard = () => {
      
      console.log(cards)
      if(tag === 'timeslot') {

        createNewSlot(slotDefaultSchema)

      } else {

        createNewMessage(messageDefaultSchema)

      }

  }

  return (
    <>
      <Button
          onClick={() => handleAddCard()}
          className="flex w-full justify-start items-center gap-1 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-slate-500"
      >
          <p>New {tag === 'timeslot' ? 'Slot' : 'Message'}</p>
          <Plus width={12} height={12} />
      </Button>
    </>
  );
};

export default SortableList