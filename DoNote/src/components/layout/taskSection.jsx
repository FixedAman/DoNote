import { MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";
import { FaCircleCheck } from "react-icons/fa6";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { CSS } from "@dnd-kit/utilities";
import { re_orderInFirebase } from "../../app/features/tasks/taskSlice";
const SortableTaskItem = ({
  task,
  onComplete,
  handleUpdateText,
  handleDelete,
  loading,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between dark:bg-slate-700 p-3 rounded shadow "
    >
      <span className="dark:text-slate-200">{task.text}</span>
      <div className="button-components flex">
        <button
          className=" p-2 text-red-500 hover:text-red-700 
    dark:text-red-400 dark:hover:text-red-300
    transition-colors duration-200
    rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
          disabled={loading}
          onClick={() => handleDelete(task.id)}
        >
          <MdDelete />
        </button>
        <button
          disabled={loading}
          onDoubleClick={(e) => {
            handleUpdateText(task);
          }}
        >
          <FcEditImage />
        </button>
        <button
          className={`p-2 ml-2
    text-gray-400 hover:text-green-500 
    dark:text-gray-500 dark:hover:text-green-400
    transition-colors duration-200
    rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 
     
     `}
          disabled={loading}
          onClick={() =>
            onComplete({
              taskId: task.id,
              completed: task.completed,
            })
          }
        >
          <FaCircleCheck
            className={`${
              task.completed
                ? "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </li>
  );
};

const TaskList = ({
  filteredTasks,
  onComplete,
  handleUpdateText,
  loading,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = filteredTasks.findIndex((t) => t.id === active.id);
    const newIndex = filteredTasks.findIndex((t) => t.id === over.id);
    const reordered = arrayMove(filteredTasks, oldIndex, newIndex);
    // setFilteredTask(reordered);

    console.log(over);
    const updatedTasks = reordered.map((task, index) => ({
      id: task.id,
      order: index,
    }));
    if (updatedTasks) {
      dispatch(re_orderInFirebase(updatedTasks));
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={filteredTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.map((task) => (
            <SortableTaskItem
              task={task}
              key={task.id}
              onComplete={onComplete}
              handleDelete={handleDelete}
              handleUpdateText={handleUpdateText}
              loading={loading}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};
export default TaskList;
