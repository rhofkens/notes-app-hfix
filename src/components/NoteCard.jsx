import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUpdateNote, useDeleteNote } from '../integrations/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tagColorMap = {
  'Videos': 'purple',
  'Wishlist': 'amber',
  'Assignment': 'blue',
  'Projects': 'teal',
  'Work': 'pink',
  'Study': 'amber',
};

const NoteCard = ({ id, title, content, color, tag, created_at }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    deleteNote.mutate(id);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateNote.mutate({ id, title: editedTitle, content: editedContent, color: editedColor, tag: editedTag });
    setIsEditModalOpen(false);
  };

  const handleTagChange = (newTag) => {
    setEditedTag(newTag);
    setEditedColor(tagColorMap[newTag]);
  };

  return (
    <div className={`bg-${color}-500 rounded-lg p-6 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full uppercase transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:scale-105">
          {tag}
        </span>
      </div>
      <p className="mb-6 whitespace-pre-wrap">{content}</p>
      <div className="flex justify-between items-center text-sm">
        <span>{formattedTime}</span>
        <span>{formattedDate}</span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-50">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <Input
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              required
            />
            <Select value={editedTag} onValueChange={handleTagChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(tagColorMap).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Color"
              value={editedColor}
              readOnly
              className={`bg-${editedColor}-500 text-white`}
            />
            <DialogFooter>
              <Button type="submit">Update Note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteCard;