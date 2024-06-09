import { Modal, Text, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalFooter } from '@chakra-ui/react'

export const HelpModal = ({isHelpModalOpen, onHelpModalClose}) => {
  
  return (
    <>
      <Modal onClose={onHelpModalClose} isOpen={isHelpModalOpen} size={'xl'} isCentered>
        <ModalOverlay/>
        <ModalContent bg={'panelGrey'}>
          <ModalHeader fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'24px'}>
            Help
          </ModalHeader>
          <ModalCloseButton color={'white'}/>
          <ModalBody>
            <Text fontSize={'lg'} color={'gray.500'} maxWidth={'500px'} textAlign={'center'}>
              - Your N64 game MUST be a USA version ONLY. The model is not trained on any other versions like PAL<br/>- The uploaded image must be of the file type/size specified, and it must be of the back of your N64 game<br/>- Failure to upload an image with the specifications outlined in the last bullet point will result in unpredictable outcomes<br/><br/>Visit authenticate64's <Text as={'a'} color={'brandGreen'} href="https://github.com/KingShibe/authenticate64" target="_blank" rel="noopener noreferrer">GitHub</Text> for more information 
            </Text>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};