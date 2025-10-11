type IconProps = {
  name: string;
  className?: string; // estilo opcional
};

export function Icon({ name, className = "" }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

export const BreakfastIcon = () => <Icon name="coffee" />;
export const SnackIcon = () => <Icon name="bakery_dining" />;
export const DinnerIcon = () => <Icon name="local_dining" />;
export const ExitIcon = () => <Icon name="logout" />;
export const UserIcon = () => <Icon name="person" />;
export const LockPersonIcon = () => <Icon name="lock_person" />
export const RestaurantIcon = () => <Icon name="restaurant" />;