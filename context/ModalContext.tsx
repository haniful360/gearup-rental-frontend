'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  openModal: (content: ReactNode | Record<string, unknown>) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  return (
    <ModalContext.Provider value={{ openModal: (content: any) => setModalContent(content), closeModal: () => setModalContent(null), modalContent }}>
      {children}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModalContent(null)}>
          <div className="rounded-lg bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>{modalContent as ReactNode}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
