import { useEffect, useRef } from 'react';

interface outSideCLickProps {
     handler: () => void;
     listenCapturing?: boolean;
}

export const useOutSideclick = ({
     handler,
     listenCapturing = true,
}: outSideCLickProps) => {
     const clickRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          function handleClick(e: MouseEvent) {
               const overlay = (e.target as HTMLElement)?.dataset?.overlay;

               if (overlay) {
                    handler();
               }
          }

          document.addEventListener('click', handleClick, listenCapturing);

          return () => {
               document.removeEventListener(
                    'click',
                    handleClick,
                    listenCapturing
               );
          };
     }, [handler, listenCapturing]);

     return clickRef;
};
