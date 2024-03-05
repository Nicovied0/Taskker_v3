import "./CalendarDay.css";
import {
  Eventcalendar,
  getJson,
  setOptions,
  Toast,
  localeEs,
} from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ContainerProps {}

setOptions({
  locale: localeEs,
  theme: "ios",
  themeVariant: "light",
  responsive: {
    xsmall: {
        view: {
            calendar: {
                type: 'week'
            },
            agenda: {
                type: 'day'
            }
        }
    },
    custom: { // Custom breakpoint
        breakpoint: 600,
        view: {
            calendar: { 
                labels: true
            }
        }
    }

}
});

const CalendarDay: React.FC<ContainerProps> = () => {
    const [myEvents, setEvents] = useState([]);
    const [isToastOpen, setToastOpen] = useState(false);
    const [toastText, setToastText] = useState();
  
    const handleToastClose = useCallback(() => {
      setToastOpen(false);
    }, []);
  
    const handleEventClick = useCallback((args:any) => {
      setToastText(args.event.title);
      setToastOpen(true);
    }, []);
  
    const myView = useMemo(() => ({ calendar: { labels: true } }), []);
  
    useEffect(() => {
      getJson(
        'https://trial.mobiscroll.com/events/?vers=5',
        (events) => {
          setEvents(events);
          console.log(events)
        },
        'jsonp',
      );
    }, []);
    
  
    return (
      <>
        <Eventcalendar
         clickToCreate={true}
         dragToCreate={true}
         dragToMove={true}
         dragToResize={false}
         eventDelete={true}
          data={myEvents}
          view={myView}
          onEventClick={handleEventClick}
        />
        <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
      </>
  );
};

export default CalendarDay;
