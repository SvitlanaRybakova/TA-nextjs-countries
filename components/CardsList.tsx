import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { ICountry } from "@/app/common/interfaces";

interface CardListProps {
  countries: ICountry[];
}

const CardList: React.FC<CardListProps> = ({ countries }) => {
  return countries.map((country: ICountry) => (
    <Card className="w-64 h-56" key={uuidv4()}>
      <CardHeader>
        <CardTitle className="text-lg">{country.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="italic text-sm">Capital: {country.capital}</p>
      </CardContent>
    </Card>
  ));
};

export default CardList;
