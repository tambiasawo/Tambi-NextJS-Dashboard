import { render } from "@testing-library/react";
import Card, { convertStringToFloat } from "./Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";

describe("Card", () => {
  it("should render", () => {
    render(
      <Card
        icon={<AnnouncementIcon />}
        heading="Total Users"
        main={10.23}
        footer="12% more than previous year"
      />
    );
    let percentageValue = convertStringToFloat("19% more than previous year");
    expect(percentageValue).toEqual(19);
  });
});
