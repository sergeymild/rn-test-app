import React, { memo } from 'react';
import { TagModel } from 'src/api/models.ts';
import { Modal, ModalPropsIOS } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TagsListView } from 'src/cources/tags/TagsListView.tsx';

interface Props {
  isVisible: boolean;
  selected?: TagModel;
  onClose: () => void;
  tags: TagModel[];
  onSelect: (index: number) => void;
}

const supportedOrientations: ModalPropsIOS['supportedOrientations'] = [
  'landscape',
  'landscape-left',
  'landscape-right',
  'portrait',
  'portrait-upside-down',
];
export const TagsSelectionModal: React.FC<Props> = memo(props => {
  return (
    <Modal
      visible={props.isVisible}
      supportedOrientations={supportedOrientations}
    >
      <SafeAreaProvider>
        <TagsListView
          selected={props.selected}
          onClose={props.onClose}
          tags={props.tags}
          onSelect={props.onSelect}
        />
      </SafeAreaProvider>
    </Modal>
  );
});
TagsSelectionModal.displayName = 'TagsSelectionModal';
