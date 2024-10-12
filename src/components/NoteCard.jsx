import React, { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUpdateNote, useDeleteNote } from '../integrations/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const tagColorMap = {
  'Videos': 'purple',
  'Wishlist': 'yellow',
  'Assignment': 'blue',
  'Projects': 'teal',
  'Work': 'pink',
  'Study': 'orange',
};

const NoteCard = ({ id, title, content, color, tag, created_at }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedTag, setEditedTag] = useState(tag);
  const [editedColor, setEditedColor] = useState(color);

  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const createdDate = new Date(created_at);
  const formattedTime = isValid(createdDate) ? format(createdDate, 'hh:mm a') : 'Invalid date';
  const formattedDate = isValid(createdDate) ? format(createdDate, 'dd MMMM yyyy') : 'Invalid date';

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteNote.mutate(id, {
      onSuccess: () => {
        toast.success('Note deleted successfully');
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error(`Error deleting note: ${error.message}`);
      }
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!editedTitle || !editedContent || !editedTag) {
      toast.error('Please fill in all fields');
      return;
    }
    updateNote.mutate({ id, title: editedTitle, content: editedContent, color: editedColor, tag: editedTag }, {
      onSuccess: () => {
        toast.success('Note updated successfully');
        setIsEditModalOpen(false);
      },
      onError: (error) => {
        toast.error(`Error updating note: ${error.message}`);
      }
    });
  };

  useEffect(() => {
    if (editedTag) {
      setEditedColor(tagColorMap[editedTag]);
    }
  }, [editedTag]);

  return (
    <div className={`bg-${color}-500 rounded-lg p-6 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full uppercase transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105">
          {tag}
        </span>
      </div>
      <p className="mb-6 whitespace-pre-wrap">{content}</p>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between text-sm">
          <span>{formattedTime}</span>
          <span>{formattedDate}</span>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <Input
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
            <Textarea
              placeholder="Content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
            <Select value={editedTag} onValueChange={setEditedTag} required>
              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {Object.keys(tagColorMap).map((t) => (
                  <SelectItem key={t} value={t} className="text-white hover:bg-gray-700">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <span>Selected Color:</span>
              <div
                className={`w-6 h-6 rounded-full ${editedColor ? `bg-${editedColor}-500` : 'bg-gray-500'}`}
              ></div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Update Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this note?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-700 text-white hover:bg-gray-600">Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteCard;