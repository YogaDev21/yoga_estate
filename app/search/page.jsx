"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter, BsFolder } from "react-icons/bs";
import SearchFilters from "@/components/SearchFilters";
import Property from "@/components/Property";
import noresult from "@/assets/images/noresult.svg";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
const page = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const purpose = searchParams.get("purpose") || "for-rent";
  const rentFrequency = searchParams.get("rentFrequency") || "yearly";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000000";
  const roomsMin = searchParams.get("roomsMin") || "0";
  const bathsMin = searchParams.get("bathsMin") || "0";
  const sort = searchParams.get("sort") || "price-desc";
  const areaMax = searchParams.get("areaMax") || "35000";
  const locationExternalIDs = searchParams.get("locationExternalIDs") || "5002";
  const categoryExternalID = searchParams.get("categoryExternalID") || "4";
  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.hits.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      {properties.hits.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image alt="No Result" src={noresult} />
          <Text fontSize="2xl" marginTop="3">
            No Result Found!
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default page;
