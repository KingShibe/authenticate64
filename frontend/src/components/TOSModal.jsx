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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet. Sit amet justo donec enim diam vulputate ut pharetra. Diam quis enim lobortis scelerisque fermentum dui. Pulvinar proin gravida hendrerit lectus a. Posuere lorem ipsum dolor sit amet consectetur adipiscing. A cras semper auctor neque vitae tempus quam pellentesque. Lacinia quis vel eros donec ac.
            </Text>
          </ModalBody>
          <ModalFooter>
              {/* <Button
              bg={'brandPurple'}
              rounded={'full'}
              color={'white'}
              flex={'1 0 auto'}
              _hover={{ bg: 'blue.500' }}
              _focus={{ bg: 'blue.500' }}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};