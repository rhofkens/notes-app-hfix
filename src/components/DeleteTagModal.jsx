import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTags } from '../integrations/supabase/hooks/useTags';
import { useDeleteTag, useCountNotesByTag } from '../integrations/supabase/hooks/useTagOperations';
import { toast } from 'sonner';

const DeleteTagModal = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const { data: tags, isLoading: tagsLoading } = useTags();
  const { mutate: deleteTag } = useDeleteTag();
  const { data: noteCount, isLoading: countLoading } = useCountNotesByTag(selectedTag?.tag);

  const handleDelete = async () => {
    if (!selectedTag) {
      toast.error('Please select a tag to delete');
      return;
    }

    try {
      await deleteTag(selectedTag.id);
      toast.success('Tag and associated notes deleted successfully');
      onClose();
    } catch (error) {
      toast.error(`Error deleting tag: ${error.message}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {tagsLoading ? (
            <p>Loading tags...</p>
          ) : (
            <RadioGroup onValueChange={setSelectedTag} value={selectedTag}>
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={tag} id={tag.id} />
                  <Label htmlFor={tag.id}>{tag.tag}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
        {selectedTag && (
          <p className="text-yellow-500">
            {countLoading
              ? 'Calculating affected notes...'
              : `Deleting this tag will delete ${noteCount} note${noteCount !== 1 ? 's' : ''} using this tag.`}
          </p>
        )}
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleDelete} variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTagModal;