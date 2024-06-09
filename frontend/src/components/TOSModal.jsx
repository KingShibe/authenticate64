import { Modal, Text, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalFooter } from '@chakra-ui/react'

export const TOSModal = ({isTOSModalOpen, onTOSModalClose}) => {
  
  return (
    <>
      <Modal onClose={onTOSModalClose} isOpen={isTOSModalOpen} size={'xl'} isCentered>
        <ModalOverlay/>
        <ModalContent bg={'panelGrey'}>
          <ModalHeader fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'24px'}>
            Terms Of Service
          </ModalHeader>
          <ModalCloseButton color={'white'}/>
          <ModalBody>
            <Text fontSize={'lg'} color={'gray.500'} maxWidth={'500px'} textAlign={'center'}>
              By using this website, you acknowledge that the information provided of whether your N64 game is real or fake is just a prediction. The information provided should not be used to make any decisions and it is merely provided for informative purposes. The creator of this project is not liable for any issues or damages that you incur from the provided information.<br/><br/>Visit authenticate64's <Text as={'a'} color={'brandGreen'} href="https://github.com/KingShibe/authenticate64" target="_blank" rel="noopener noreferrer">GitHub</Text> for more information
            </Text>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};