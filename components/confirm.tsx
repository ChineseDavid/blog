import { Modal, ModalBody, ModalContent, ModalFooter, Button } from '@heroui/react'
import React from 'react'

interface ConfirmProps {
  isOpen: boolean;
  content: string;
  onClose?: (isConfirm: boolean) => void;
}
export default function Confirm({ isOpen, content, onClose }: ConfirmProps) {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        {() => <>
          <ModalBody>
            <div className='pt-8'>
              {content}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => onClose?.(false)}>
              取消
            </Button>
            <Button onPress={() => onClose?.(true)}>
              确认
            </Button>
          </ModalFooter>
        </>
        }
      </ModalContent>
    </Modal>
  )
}
