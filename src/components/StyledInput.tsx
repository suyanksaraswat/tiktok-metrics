interface StyledInputI {
  value: string;
  onChange: (e: any) => void;
  error?: boolean;
  errorMessage?: string;
}

const StyledInput = ({
  value,
  onChange,
  error,
  errorMessage,
}: StyledInputI) => {
  return (
    <div className="mb-6 w-full">
      <input
        className={
          error
            ? ` mb-1 w-full rounded-2xl border border-[#FF6666] px-6 py-4 text-base font-bold text-[#0F1D40] focus:shadow-input-error focus:outline-none focus-visible:shadow-input-error focus-visible:outline-none`
            : `w-full rounded-2xl border border-[#E2E4E8] px-6 py-4 text-base font-bold text-[#0F1D40] focus:shadow-input focus:outline-none focus-visible:shadow-input focus-visible:outline-none`
        }
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && errorMessage && (
        <p className="text-base font-bold text-[#F03D3D]">{errorMessage}</p>
      )}
    </div>
  );
};

export default StyledInput;

// border-[${
//     error ? "#FF6666" : "#E2E4E8"
//   }]
