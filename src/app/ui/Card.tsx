import { Icon, Stack } from "@mui/material";
import React from "react";

type Props = {
  icon: React.ReactElement;
  heading: string;
  main: number;
  footer: string;
};

export const convertStringToFloat = (string: string) => parseFloat(string);

const Card = ({ icon, heading, main, footer }: Props) => {
  let percentageValue = convertStringToFloat(footer);

  return (
    <div className="rounded-xl bg-softBg px-3 flex justify-start gap-10 items-baseline h-[150px]">
      <Icon fontSize="large" sx={{ height: "45px" }}>
        {icon}
      </Icon>
      <Stack className="flex flex-col flex-shrink" spacing={2}>
        <h2 className="text-xl">{heading}</h2>
        <p className="text-2xl">{main}</p>
        <p className="text-sm">
          <span
            className={percentageValue < 0 ? "text-red-500" : "text-green-500"}
          >
            {percentageValue + "% "}
          </span>
          {footer.substring(footer.indexOf("more"))}
        </p>
      </Stack>
    </div>
  );
};

export default Card;
