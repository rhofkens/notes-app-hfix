import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddTag } from '../integrations/supabase/hooks/useTags';
import { toast } from 'sonner';

const colorOptions = [
  { name: 'Purple', value: 'purple' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Blue', value: 'blue' },
  { name: 'Teal', value: 'teal' },
  { name: 'Pink', value: 'pink' },
  { name: 'Orange', value: 'orange' },
  { name: 'Red', value: 'red' },
  { name: 'Green', value: 'green' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Lime', value: 'lime' },
  { name: 'Fuchsia', value: 'fuchsia' },
];

const AddTagModal = ({ isOpen, onClose }) => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const addTag = useAddTag();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tagName && selectedColor) {
      try {
        await addTag.mutateAsync({ tag: tagName, color: selectedColor });
        toast.success('Tag added successfully');
        setTagName('');
        setSelectedColor('');
        onClose();
      } catch (error) {
        toast.error('Failed to add tag');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Add New Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
          />
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-full h-8 rounded-md bg-${color.value}-500 ${
                  selectedColor === color.value ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => setSelectedColor(color.value)}
              />
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Add Tag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagModal;